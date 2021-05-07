export async function getSignature() {
  const response = await fetch('/api/sign');

  const data = await response.json();
  const { signature, timestamp } = data;

  return { signature, timestamp };
}
