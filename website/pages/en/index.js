/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const Button = require('react-bootstrap').Button;
const Image = require('react-bootstrap').Image;
const React = require('react');

class HomeSplash extends React.Component {

  render() {
    const {siteConfig} = this.props;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
      </h2>
    );

    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          <p>
            Issuest is simple. Just download the chrome extension, or build from source, click the icon, and post to any repo right from your browser.
          </p>
          <div className="row justify-content-center">
            <div className="col-lg-3 col-md-4 col-sm-12">
            <Button style={{width: '100%'}} id="b1" variant="outline-primary">Download For Chrome</Button>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-12">
            <Button style={{width: '100%'}} id="b2" variant="secondary">Open In Browser</Button>
            </div>
          </div>
          <Image style={{paddingTop: '20px'}} fluid src={this.props.siteConfig.baseUrl + this.props.siteConfig.screenshotImage} alt="issueist-screenshot"/>
          <div style={{paddingTop: '75px'}} className="row justify-content-center">
            <div>
              <h3>Features</h3>
            </div>
            <div className="row justify-content-center">
              <p style={{maxWidth: '60%'}} className="lead">Issueist gives an easy way to post issues to your Github repos from anywhere. It comes packed with features to improve upon the native functionality of Github issues. Manage tasks, keep track of ideas, and leverage the power of GH issues.</p>
            </div>
          </div>
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          var b1 = document.getElementById('b1');
          var b2 = document.getElementById('b2');
          b1.onclick = function() {
            window.open('https://chrome.google.com/webstore/detail/issueist/eiekclnnglajcfmddidpcipngednfena')
          };
          b2.onclick = function() {
            window.open('https://issueist.wolfpak.now.sh/', 'issueist', 'width=400px,height=650px')
          };
        `,
          }}
        />
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
      </div>
    );
  }
}

module.exports = Index;
