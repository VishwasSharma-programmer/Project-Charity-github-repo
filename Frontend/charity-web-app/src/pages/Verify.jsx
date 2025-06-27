function Verify() {
  return (
    <div>
      <h2>Organizer Verification</h2>
      <form>
        <input type="text" placeholder="Full Name" required /><br />
        <input type="email" placeholder="Email" required /><br />
        <input type="file" accept="image/*,.pdf" required /><br />
        <button type="submit">Submit for Verification</button>
      </form>
    </div>
  );
}
export default Verify;
