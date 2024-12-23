const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
  };
  
  /**
   * T(°F) = T(°C) x 9/5 + 32
   * T(°C) = (T(°F) - 32) * 5/9
   */
  
  function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
  }
  
  function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
  }
  
  function BoilingVerdict({ celsius }) {
    return (
      <div>
        {celsius >= 100 ? (
          <div className="alert alert-success">L'eau bout</div>
        ) : (
          <div className="alert alert-danger">L'eau ne bout pas</div>
        )}
      </div>
    );
  }
  
  class TemperatureInput extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(e) {
      this.props.OnTemperatureChange(e.target.value);
    }
  
    render() {
      const { temperature } = this.props;
      const name = 'scale' + this.props.scale;
      const scaleName = scaleNames[this.props.scale] || 'Inconnu';
      return (
        <div>
          <label htmlFor={name}>Température (en {scaleName})</label>
          <input
            type="text"
            id={name}
            value={temperature}
            onChange={this.handleChange}
            className="form-control mb-4"
          />
        </div>
      );
    }
  }
  
  class Calculator extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        temperature: 20,
        scale: 'c'
      };
  
      this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
      this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    }
  
    handleCelsiusChange(temperature) {
      this.setState({ scale: 'c', temperature });
    }
  
    handleFahrenheitChange(temperature) {
      this.setState({ scale: 'f', temperature });
    }
  
    render() {
      const { temperature, scale } = this.state;
      const celsius = scale === 'f' ? toCelsius(temperature) : temperature;
      const fahrenheit = scale === 'c' ? toFahrenheit(temperature) : temperature;
  
      return (
        <div className="container mt-5">
          <TemperatureInput
            scale="c"
            temperature={celsius}
            OnTemperatureChange={this.handleCelsiusChange}
          />
          <TemperatureInput
            scale="f"
            temperature={fahrenheit}
            OnTemperatureChange={this.handleFahrenheitChange}
          />
          <BoilingVerdict celsius={parseFloat(celsius)} />
        </div>
      );
    }
  }
  
  ReactDOM.render(<Calculator />, document.querySelector('#app'));
  