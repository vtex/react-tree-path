import React, {Component} from 'react'
import PropTypes from 'prop-types'

function getDisplayName (WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export function getTreePath (props, context) {
  return context.treePath ? context.treePath + '/' + props.id : props.id
}

export default function treePath (WrappedComponent) {
  class TreePath extends Component {
    getChildContext () {
      return { treePath: this.state.treePath }
    }

    componentWillMount () {
      this.componentWillReceiveProps(this.props, this.context)
    }

    componentWillReceiveProps (nextProps, nextContext) {
      this.setState({treePath: getTreePath(nextProps, nextContext)})
    }

    render () {
      return (
        <WrappedComponent {...this.props} treePath={this.state.treePath} />
      )
    }
  }

  TreePath.contextTypes = { treePath: PropTypes.string }
  TreePath.childContextTypes = { treePath: PropTypes.string }
  TreePath.WrappedComponent = WrappedComponent
  TreePath.displayName = `TreePath(${getDisplayName(WrappedComponent)})`

  return TreePath
}
