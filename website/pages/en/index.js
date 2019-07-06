/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const Button = require('react-bootstrap').Button;
const Image = require('react-bootstrap').Image;
const React = require('react');
const EditIcon = require('react-icons/fa').FaEdit;
const CheckIcon = require('react-icons/fa').FaCheckDouble;
const GHIcon = require('react-icons/fa').FaGithubAlt;
const FaCompass = require('react-icons/fa').FaCompass;
const FaMagic = require('react-icons/fa').FaMagic;

class HomeSplash extends React.Component {

  render() {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div className="container" style={{textAlign: 'center'}}>
          <h1>Issueist</h1>
          <p className="text-monospace">
            A powerful tool to post Github issues on the go.
            </p>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-3 col-md-4 col-sm-12">
              <Button style={{ width: '100%' }} id="b1" variant="outline-primary">Download For Chrome</Button>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-12">
              <Button style={{ width: '100%' }} id="b2" variant="secondary">Open In Browser</Button>
            </div>
          </div>
        </div>
        <div className="container">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <Image
              className="d-block d-md-none"
              fluid
              src={this.props.siteConfig.baseUrl + this.props.siteConfig.screenshotImage}
              alt="issueist-screenshot" />
            <h2 className="d-none d-md-block">
              Demo <span role="img" aria-label="Finger-Down">👇</span>
            </h2>
            <iframe
              className="d-none d-md-block"
              title="embedded-app"
              src="https://issueist.wolfpak.now.sh"
              style={{
                alignSelf: 'center',
                margin: '20px 0px 20px 0px',
                border: 'none',
                height: '650px',
                width: '400px',
                boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 5px 0px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 3px 1px -2px',
              }}
            >
            </iframe>
          </div>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div>
              <h3>Features</h3>
            </div>
            <div className="row justify-content-center">
              <p style={{ maxWidth: '60%', textAlign: 'center' }} className="lead">Issueist gives an easy way to post issues to your Github repos from anywhere. It comes packed with features to improve upon the native functionality of Github issues. Manage tasks, keep track of ideas, and leverage the power of GH issues.</p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row align-children-center">
            <div className="col">
              <FaMagic size="3em" />
              <h4>Run From Anywhere</h4>
              <p>
                Issueist is a PWA, giving it incredible flexibility. Download the chrome extension, or just embed <a>https://issueist.wolfpak.now.sh</a> anywhere in your browser to use it.
                </p>
            </div>
            <div className="col">
              <EditIcon size="3em" />
              <h4>WYWSIG Editor</h4>
              <p>
                Format markdown **quick** with the help of a simple, yet _effective_ WYSWIG Editor.
                </p>
            </div>
            <div className="col">
              <FaCompass size="3em" />
              <h4>Metadata Included</h4>
              <p>
                Optionally attach meta data in invisible comments with when posting your issues. When you come back later you'll have information like what site you were on and issue context.
                </p>
            </div>
          </div>
          <div className="row align-children-center">
            <div className="col">
              <CheckIcon size="3em" />
              <h4>TODO Repositories</h4>
              <p>
                Create new repositories from within Issueist to manage new thoughts or topics. Take full advantage of Githubs feature and use it as a powerful organizer.
                </p>
            </div>
            <div className="col">
              <GHIcon size="3em" />
              <h4>Customizable OAuth</h4>
              <p>
                Change Issueist settings to point to your own personal OAuth setup. This also lets you support <b>Github Enterprise</b>. Issueist at work? I think so.
                </p>
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
      </div>
    );
  }
}

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = '' } = this.props;

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
      </div>
    );
  }
}

module.exports = Index;
