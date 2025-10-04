import React from 'react';
import './ResultDisplay.css';

const ResultDisplay = ({ result }) => {
  if (!result || !result.message) {
    return null;
  }

  const statusClass = result.success ? 'success' : 'failure';

  return (
    <div className={`result-container ${statusClass}`}>
      <div className="result-icon">{result.success ? '✅' : '❌'}</div>
      <div className={`result-message ${statusClass}`}>{result.message}</div>

      {result.details && (
        <div className={`result-details ${statusClass}`}>
          {result.details.score !== undefined && (
            <p>
              <strong>점수:</strong> {result.details.score}/100
            </p>
          )}

          {result.details.failedRule && (
            <p>
              <strong>실패한 규칙:</strong> {result.details.failedRule}
            </p>
          )}

          {result.details.hint && (
            <div className="result-hint">
              <strong>💡 힌트:</strong> {result.details.hint}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
