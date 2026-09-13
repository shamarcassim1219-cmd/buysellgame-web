import { useParams } from 'react-router-dom';

export default function ListingDetail() {
  const { id } = useParams();

  return (
    <div style={{ padding: 20 }}>
      <h2>Listing #{id}</h2>
      <p style={{ color: 'var(--hint)', marginTop: 8 }}>Listing details coming soon.</p>
    </div>
  );
}
