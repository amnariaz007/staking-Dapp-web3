import { useState } from "react";




export const Header = (props) => {



  const [inputValue, setInputValue] = useState('');

  const inputChangeHandler = (event) => {
    event.preventDefault();
    setInputValue(event.target.value);
    // inputHandler(event.target.value);
  };


  return (
    <header id='header'>
      <div className='intro'>
        <div className='overlay'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 col-md-offset-2 intro-text'>
                <h1>
                  {props.data ? props.data.title : 'Loading'}
                  <span></span>
                </h1>
                <p>{props.data ? props.data.paragraph : 'Loading'}</p>
                <input style={{ height:50,position:"absolute", top: 600, width:350, left:210, borderRadius: 8, textAlign: "center", border: "none" }}

                type="number"
                min="0"
                step="1"
                onChange={inputChangeHandler}
                value={inputValue}
                ></input>

              <a
                className='btn btn-custom btn-lg page-scroll'
              >
                Stake
              </a>{' '}
              <a
                className='btn btn-custom btn-lg page-scroll'
              >
                UnStake
              </a>{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
    </header >
  )
}
