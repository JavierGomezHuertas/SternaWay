import { Button } from "../forms/Button.jsx";
import { Icon } from "../icons/Icon.jsx";
// Función para renderizar el botón de comentarios
export function CommentButton({ commentsCount, onClick }) {
  return (
    <Button className={"likeButton large"} onClick={onClick}>
      <Icon name={"add_comment"} />
      <span>{commentsCount}</span>
    </Button>
  );
}
