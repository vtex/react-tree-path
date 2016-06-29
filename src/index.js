import React, {Component} from 'react'

export function getTreePath (props, context) {
  return context.treePath ? context.treePath + '/' + props.id : props.id
}

export default function treePath () {
  return Component => {
    class TreePath extends Component {
      static contextTypes = {
        treePath: React.PropTypes.string,
        store: React.PropTypes.object,
      }

      static childContextTypes = {
        treePath: React.PropTypes.string,
        store: React.PropTypes.object,
      }

      getChildContext () {
        return { treePath: this.state.treePath, store: this.context.store }
      }

      componentWillMount () {
        this.componentWillReceiveProps(this.props, this.context)
      }

      componentWillReceiveProps (nextProps, nextContext) {
        this.setState({treePath: getTreePath(nextProps, nextContext)})
      }

      render () {
        return (
          <Component {...this.props} treePath={this.state.treePath} />
        )
      }
    }

    return TreePath
  }
}
