import './InputBox.css';

function InputBox({ currentGuess }) {
  return (
    <div className="input_container">
      <div className="input">{currentGuess}=</div>
    </div>
  );
}

export default InputBox;
