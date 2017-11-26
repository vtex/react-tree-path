import test from 'ava'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Enzyme, { render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import treePath from './index.js'

Enzyme.configure({ adapter: new Adapter() })

// eslint-disable-next-line
class MyComponent extends Component {
  render() {
    return (
      <div id={this.props.id}>
        <span>{this.props.treePath}</span>
        <div>{this.props.children}</div>
      </div>
    )
  }
}

MyComponent.propTypes = {
  children: PropTypes.array,
  id: PropTypes.string,
  treePath: PropTypes.string,
}

const TreePathComponent = treePath(MyComponent)

test('Finds path with only one rendered element', t => {
  const wrapper = render(<TreePathComponent id="tree" />)
  t.is(wrapper.find('#tree span').text(), 'tree')
})

test('Finds path with nested rendered elements', t => {
  const wrapper = render(
    <TreePathComponent id="outer">
      <TreePathComponent id="inner1" />
      <TreePathComponent id="inner2" />
    </TreePathComponent>
  )
  t.is(wrapper.find('#outer > span').text(), 'outer')
  t.is(wrapper.find('#outer #inner1 > span').text(), 'outer/inner1')
  t.is(wrapper.find('#outer #inner2 > span').text(), 'outer/inner2')
})
