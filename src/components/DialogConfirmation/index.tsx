import ButtonInverse from "../ButtonInverse";
import ButtonPrimary from "../ButtonPrimary";

type Props = {
  id: number,
  message: string;
  onDialogAnswer: Function;
};

export default function DialogConfirmation({ id, message, onDialogAnswer }: Props) {

  /**
   * - onClick={() => onDialogAnswer(false): Quando clicarmos na parte externa (preta) no dialog ele vai considerar
   *   que cancelamos e a resposta vai ser false.
   * 
   * - Nos outros onCLick passamos também o id do produto que será deletado.
   */
  return (
    <div className="dsc-dialog-background" onClick={() => onDialogAnswer(false)}>
      <div className="dsc-dialog-box" onClick={(event) => event.stopPropagation()}>
        <h2>{message}</h2>

        <div className="dsc-dialog-btn-container" >
          <div onClick={() => onDialogAnswer(false, id)}>
            <ButtonInverse text="Não" />
          </div>

          <div onClick={() => onDialogAnswer(true, id)}>
            <ButtonPrimary text="Sim" />
          </div>
        </div>
      </div>
    </div>
  );
}
