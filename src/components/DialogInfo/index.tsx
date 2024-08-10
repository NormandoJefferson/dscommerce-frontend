import ButtonPrimary from "../ButtonPrimary";

type Props = {
  message: string;
  onDialogClose: Function;
};

export default function DialogInfo({ message, onDialogClose }: Props) {
  
  /**
   * - onClick: Chama a função onDialogClose ao clicar no botão. Também usamos o 
   *   onClick na área preta da tela e o stopPropagation para evitar de ao clicarmos 
   *   na área branca o modal fechar.
   */
  return (
    <div className="dsc-dialog-background" onClick={() => onDialogClose()}>
      <div className="dsc-dialog-box" onClick={(event) => event.stopPropagation()}>
        <h2>{message}</h2>
        <div className="dsc-dialog-btn" onClick={() => onDialogClose()}>
          <ButtonPrimary text="OK" />
        </div>
      </div>
    </div>
  );
}
