import React from 'react';
import PropTypes from 'prop-types';
import SimpleMDE from 'simplemde';
import 'simplemde/dist/simplemde.min.css';

export default class MarkdownEditor extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
  }

  static defaultProps = { 
    value: '',
    disabled: true,
    onChange: (e) => console.log(e),
  }

  componentDidMount() {
    this.simpleMDE = new SimpleMDE({ element: document.getElementById('issueist-markdown-editor'), autosave: { enabled: true } })
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