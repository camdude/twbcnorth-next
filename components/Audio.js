const Audio = ({ title, source }) => {
  return (
    <div className="Audio">
      <h4 className="Audio__title">{title}</h4>
      <audio className="Audio__control" controls>
        <source src={source.src} type={source.type} />
        Your browser does not support the audio element.
      </audio>
      <p></p>
    </div>
  );
};

export default Audio;