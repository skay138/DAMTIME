// return(
//     <div id="logining" className="damlogin">
//       <br/><h1>DAMTIME</h1>
//       <div className='damback2'>
//       <h2>Welcome Back!</h2>
//       <fieldset className='tit'>
        
//       <form>
//       <legend className='tit2'>Log In</legend>
//         <label htmlFor='input_id'>User : </label>
//         <input 
//         type='email' 
//         name='input_id' 
//         value={inputId} 
//         onChange={handleInputId}
//         placeholder="Type your e-mail" />
//         <br />
//         <label htmlFor='input_pw'>Pass : </label>
//         <input 
//         type='password' 
//         name='input_pw' 
//         value={inputPw} 
//         onChange={handleInputPw}
//         placeholder="Type your password" />
//         <br /><br/>
//         <input 
//         className="butto" 
//         type="submit"
//         onClick={onClickLogin}
//         value="LOGIN"
//         ></input></form></fieldset>
//         <br/><br/><form>
//           <Link to='/main'>
//           <input type='button' className="text" value="Using for Non remember"></input>
//         </Link><br/>
//         <Link to="/register/">
//         <input type='button' className="text" value="Or Sign Up Using"></input>
//         </Link>
//         </form>
//       </div>
//     </div>
//   );