import { ButtonStyled } from './Button.styled';

export const Button = ({ onClick }) => {
  return (
    <ButtonStyled className="Button" onClick={onClick}>
      Load more
    </ButtonStyled>
  );
};
