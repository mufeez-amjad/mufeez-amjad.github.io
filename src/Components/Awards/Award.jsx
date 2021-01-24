import * as React from 'react'

const Award = ({name, link, date, details}) => {
    return (
        <div className="award">
          <h3>
            {link ? 
                ( 
                    <a
                        target="blank"
                        href={link}
                        className="strike">
                        {name}
                    </a>
                ) : (
                    <p className="strike">
                        {name}
                    </p>
                )
            }
          </h3>
          <h5>{date}</h5>
          <p>
            {details}
          </p>
        </div>
    )
}

export default React.memo(Award);