import { useParams } from "react-router-dom";
function CampaignDetail() {
  const { id } = useParams();
  return (
    <div>
      <h2>Campaign Details - {id}</h2>
      {/* Show campaign info, milestones, donors, etc. */}
      <button>Donate</button>
    </div>
  );
}
export default CampaignDetail;
