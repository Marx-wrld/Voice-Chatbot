import './loading.css'

export default function Loading(){
    return(
        <li className='sent'>
            <img src="/src/images/cybrosys.png" alt="" />
            {/* <p className='loader-main'>
                <span className="loader"></span>
            </p> */}
              <div className="dot-loader">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </li>
    )
}