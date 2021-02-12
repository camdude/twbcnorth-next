import Button from "./Button";

const Card = props => {
  return (
    <div className="Card">
      <h2>{props.heading}</h2>
      <div className="Card__content">{props.children}</div>
      <div className="Card__action">
        <Button href={props.link}>{props.btnText} &rarr;</Button>
      </div>
    </div>
  );
};

export default Card;
