import React, {Component} from 'react'

export function getTreePath (props, context) {
  return context.treePath ? context.treePath + '/' + props.id : props.id
}

export default function treePath () {
  return Component => {
    class TreePath extends Component {
      static contextTypes = {
        treePath: React.PropTypes.string,
      }

      static childContextTypes = {
        treePath: React.PropTypes.string,
      }

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
          <Component {...this.props} treePath={this.state.treePath} />
        )
      }
    }

    return TreePath
  }
}
