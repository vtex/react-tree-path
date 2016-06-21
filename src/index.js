import React, {Component} from 'react'

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
        this.setState({
          treePath: this.getTreePath(this.props, this.context),
        })
      }

      componentWillReceiveProps (nextProps, nextContext) {
        this.setState({
          treePath: this.getTreePath(nextProps, nextContext),
        })
      }

      getTreePath = (props, context) => {
        let id = props.id

        if (context.treePath) {
          id = context.treePath + '/' + id
        }

        return id
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
