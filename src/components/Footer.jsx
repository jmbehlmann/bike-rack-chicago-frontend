export function Footer() {
  const handleAboutClick = () => {
    alert('This site was built using following technologies: Ruby, Rails, React, Google Maps, Bootstrap, City of Chicago data, Heroku, Github Pages. This site provides applications using data that has been modified for use from its original source, www.cityofchicago.org, the official website of the City of Chicago.  The City of Chicago makes no claims as to the content, accuracy, timeliness, or completeness of any of the data provided at this site.  The data provided at this site is subject to change at any time.  It is understood that the data provided at this site is being used at one’s own risk. For questions or concerns please contact me through github');
  };

  return (
    <div className="container-xxl">
      <footer className="d-flex justify-content-center">
        <p className="text-center" style={{ fontSize: '0.5rem', marginRight: '10px' }}>&copy; 2024 James Behlmann. All rights reserved.</p>
        <a href="#" onClick={handleAboutClick} style={{ fontSize: '0.5rem' }}>About</a>
      </footer>
    </div>
  );
}
