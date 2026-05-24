function Matrix({ row, column }) {
  const grid = Array.from({ length: row }, () => new Array(column).fill(null))

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${column}, 60px)`, gap: '4px' }}>
      {grid.flat().map((_, idx) => (
        <div
          key={idx}
          style={{
            width: 60,
            height: 60,
            border: '2px solid #333',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            cursor: 'pointer',
          }}
        />
      ))}
    </div>
  )
}

export default Matrix