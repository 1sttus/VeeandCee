import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(_error, _info) {
    // TODO: send to logging service
    // console.error('ErrorBoundary caught', _error, _info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-8">
          <div className="max-w-md text-center">
            <h2 className="text-2xl font-semibold">Something went wrong</h2>
            <p className="mt-4 text-sm text-gray-600">An unexpected error occurred. Please try refreshing the page.</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-4 py-2 bg-brown text-white rounded"
            >
              Reload
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
