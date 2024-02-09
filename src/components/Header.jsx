export function Header() {
  return (
    <header>
    <div className="container-xxl">
      <div className="row px-2 mt-2">
        <div className="col-sm-1">
          <img src="https://raw.githubusercontent.com/jmbehlmann/bike-rack-chicago-frontend/main/public/star-text.png" className="d-block" style={{ height: "2.25rem", objectFit: "contain" }}/>
        </div>
        <div className="col sm-11 align-left">
          {/* <h3>Bike Rack Chicago</h3> */}
        </div>
      </div>
    </div>
      {/* <nav>
        <a href="#">Home</a> | <a href="#">Link</a>
      </nav> */}
    </header>
  )
}
