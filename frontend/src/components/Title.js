import React from 'react'

export default function Title({name, title}) {
    return (
        <div>
            <div className="col-10 mx-auto my-2 text-center text title">
                <p className="text-capitalize font-weight-bold text-black" style={{marginBottom: "35px", fontSize: "3rem"}}>
                    {name}
                    <strong className="text-red" style={{marginBottom: "35px", fontSize: "3rem"}}>{title}</strong>
                </p>
            </div>
        </div>
    )
}
