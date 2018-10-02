import * as React from "react";
import PropTypes from "prop-types";
// import facebookImage from "../images/facebook_logo.png";
// import instagramImage from "../images/instagram-logo.png";
// import twitterImage from "../images/twitter-icon.png";
// import youtubeImage from "../images/youtube-logo.png";

class Footer extends React.Component {
  renderFooterCells = links => {
    const elems = links.map((link, index) => {
      return (
        <div key={index} className="text-left col col-md-3 col-6">
          {link}
        </div>
      );
    });
    return elems;
  };

  render() {
    return (
      <div className="footer-wrapper">
        <div className="footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 list-container order-1 order-md-0">
                <div className="row">
                  {this.renderFooterCells(this.props.links)}
                </div>
              </div>
              <div
                className="col-md-8 col-xs-12 float-left order-2 order-md-1"
                style={{ display: "inline-block" }}
              >
                @2016 Ticketek Pty Ltd (ABN 92 010 129 110) All rights reserved.
                Version 18.02.01
              </div>
              <div className="col-md-4 col-xs-12 order-0 order-md-2">
                <div className="row justify-content-center mb-4 mb-md-0">
                  <div className="icons-container">
                    <i className="fa fa-facebook-square icons" />
                    <i className="fa fa-twitter-square icons" />
                    <i className="fa fa-youtube-play icons" />
                    <i className="fa fa-instagram icons" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  links: PropTypes.array
};

export { Footer };
