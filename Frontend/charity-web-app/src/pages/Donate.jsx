import { useParams } from "react-router-dom";
function Donate() {
  const { id } = useParams();
  return (
    <div>
      <h2>Donate to Campaign {id}</h2>
      <form>
        <input type="number" step="0.01" placeholder="Amount (ETH)" required /><br />
        <button type="submit">Donate</button>
      </form>
    </div>
  );
}
export default Donate;
