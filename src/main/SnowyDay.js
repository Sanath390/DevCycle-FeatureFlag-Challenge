import '../SnowyDay.css';

export const SnowyDay = () => {
    return (
        <div className="snowy-container">
            {[...Array(1)].map((_, index) => (
                <div key={`cloudsnowy-${index}`} className="cloudsnowy"></div>
            ))}

            {/* Snowflakes */}
            {[...Array(1)].map((_, index) => (
                <div key={`snowflake-${index}`} className="snowflake"></div>
            ))}
        </div>
    );
};