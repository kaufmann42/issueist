import React from 'react';
import PropTypes from 'prop-types';
import SimpleMDE from 'simplemde';
import 'simplemde/dist/simplemde.min.css';
import logger from '../../services/logger';

export default class MarkdownEditor extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    disabled: true,
    onChange: (e) => logger.debug(e),
  }

  componentDidMount() {
    this.simpleMDE = new SimpleMDE({ element: document.getElementById('issueist-markdown-editor'), autosave: {delay: 500, uniqueId: 'issueist-body', enabled: true } })
    this.simpleMDE.codemirror.on("change", () => {
      this.props.onChange(this.simpleMDE.value());
    });
  }

  render() {
    return (
      <textarea id="issueist-markdown-editor" />
    );
  }
}