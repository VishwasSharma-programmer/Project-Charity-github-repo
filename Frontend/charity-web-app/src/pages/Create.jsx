function Create() {
  return (
    <div>
      <h2>Create a New Campaign</h2>
      <form>
        <input type="text" placeholder="Title" required /><br />
        <textarea placeholder="Description" required /><br />
        <input type="number" placeholder="Target Amount (ETH)" required /><br />
        <input type="date" required /><br />
        <input type="file" accept="image/*" /><br />
        <button type="submit">Create Campaign</button>
      </form>
    </div>
  );
}
export default Create;
