(* Copyright (C) 2015-2016 Bloomberg Finance L.P.
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * In addition to the permissions granted to you by the LGPL, you may combine
 * or link a "work that uses the Library" with a publicly distributed version
 * of this file to produce a combined library or application, then distribute
 * that combined work under the terms of your choosing, with no requirement
 * to comply with the obligations normally placed on you by section 4 of the
 * LGPL version 3 (or the corresponding section of a later version of the LGPL
 * should you choose to use a later version).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA. *)






let rec has_exit_code exits  (lam : Lambda.lambda)  : bool = 
  match lam with
  | Lambda.Lvar _
  | Lambda.Lconst _ 
  | Lambda.Lfunction _ (* static exit can not across function boundary *)
    -> false
  | Lambda.Lapply (l,args,_apply_info) 
    -> has_exit_code exits l || List.exists (fun x -> has_exit_code exits x ) args 

  | Lambda.Llet (_kind,_id,v,body) 
    -> has_exit_code exits v || has_exit_code exits body
  | Lambda.Lletrec (binding,body) ->
    List.exists (fun (_, l) -> has_exit_code exits l ) binding ||
    has_exit_code exits body    
  | Lambda.Lprim (_,ls) 
    -> List.exists (fun x -> has_exit_code exits x) ls
  | Lambda.Lswitch (l,lam_switch) 
    -> has_exit_code exits l || has_exit_code_lam_switch exits lam_switch

  | Lambda.Lstringswitch (l,ls,opt) -> 
    has_exit_code exits l ||
    List.exists (fun (_,l) -> has_exit_code exits l) ls ||
    (match opt with 
    | None -> false
    | Some x -> has_exit_code exits l )
  | Lambda.Lstaticraise (v,ls) ->
      exits v ||    
    List.exists (has_exit_code exits) ls
  | Lambda.Lstaticcatch (l,_,handler) 
    ->
    has_exit_code exits l || has_exit_code exits handler
  | Lambda.Ltrywith (l,_, handler) 
    ->
    has_exit_code exits l || has_exit_code exits handler
  | Lambda.Lifthenelse (a,b,c) 
    -> 
    has_exit_code exits a || has_exit_code exits b || has_exit_code exits c
  | Lambda.Lsequence (a,b) 
    ->
    has_exit_code exits a || has_exit_code exits b
  | Lambda.Lwhile (a,b) 
    ->
    has_exit_code exits a || has_exit_code exits b
  | Lambda.Lfor (_,a,b,_dir,body) -> 
    has_exit_code exits a 
    || has_exit_code exits b
    || has_exit_code exits body
    
  | Lambda.Lassign (_,a) 
    -> 
    has_exit_code exits a
  | Lambda.Lsend (_,obj,l,ls,_loc) 
    -> 
    has_exit_code exits obj ||
    has_exit_code exits l ||
    List.exists (has_exit_code exits) ls
  | Lambda.Levent (b,_) 
    -> has_exit_code exits b
  | Lambda.Lifused (_,b) 
    -> has_exit_code exits b

and has_exit_code_lam_switch exits (lam_switch : Lambda.lambda_switch) = 
  match lam_switch with
   | { sw_numconsts = _; sw_consts; sw_numblocks = _ ; sw_blocks; sw_failaction } ->
     List.exists (fun (_,l) -> has_exit_code exits l) sw_consts ||
     List.exists (fun (_,l) -> has_exit_code exits l)  sw_blocks ||
     (match sw_failaction with 
     | None -> false 
     | Some x -> has_exit_code exits x)
