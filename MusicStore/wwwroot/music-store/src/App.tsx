import * as React from 'react';
import MainTable from './containers/MainTable';
import EditRecord from './containers/EditRecord';

interface AppStates {
  display: string;
  data: any;
}

class App extends React.PureComponent<any, AppStates> {

  constructor(props: any) {
    super(props);

    this.state = {
      display: 'MainTable',
      data: null,
    };
  }

  /* Change main container function */
  changeContainer: (data: AppStates) => void = (data) => {
    this.setState({ display: data.display, data: data.data });
  }

  render(): JSX.Element {

    let container: JSX.Element;
    switch (this.state.display) {
      case 'MainTable':
        container = <MainTable changeContainer={(data: AppStates) => this.changeContainer(data)} />;
        break;
      default:
        container = <EditRecord changeContainer={(data: AppStates) => this.changeContainer(data)} data={this.state.data} />;
    }

    return (
      <div className="App">
        {container}
      </div>
    );
  }
}

export default App;
