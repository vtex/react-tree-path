import test from 'ava'
import React, {Component, PropTypes} from 'react'
import { render } from 'enzyme'
import treePath from './index.js'

// eslint-disable-next-line
class MyComponent extends Component {
  render () {
    return <span id={this.props.id}>{this.props.treePath}</span>
  }
}

MyComponent.propTypes = { id: PropTypes.string, treePath: PropTypes.string }

const TreePathComponent = treePath()(MyComponent)

test('Finds path with only one rendered element', t => {
  const wrapper = render(<TreePathComponent id="tree" />)
  t.is(wrapper.find('#tree').text(), 'tree')
})
