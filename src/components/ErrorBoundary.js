import React from "react";
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div className="flex w-full justify-center items-center p-10 bg-cool-gray-200 ">
          <p className="block w-1/2 p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h2 className="text-red-600 text-xl text-center w-full mb-4">
              Something went wrong.
            </h2>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {" "}
              {this.state.error && this.state.error.toString()}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              <br />
              {this.state.errorInfo.componentStack}
            </p>
          </p>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}
