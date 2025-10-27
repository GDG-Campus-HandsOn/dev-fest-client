import React, { useState } from 'react';
import './ResultDisplay.css';

const ResultDisplay = ({ result }) => {
  console.log('ResultDisplay received result:', result);
  const [expandedRules, setExpandedRules] = useState({});

  if (!result || !result.message) {
    return null;
  }

  const isSuccess = result.status === 'success';
  const statusClass = isSuccess ? 'success' : 'failure';

  const toggleRule = (index) => {
    setExpandedRules((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className={`result-container ${statusClass}`}>
      <div className="result-icon">{isSuccess ? '🎉' : '❌'}</div>
      <div className={`result-message ${statusClass}`}>
        {result.title || result.message}
      </div>

      {/* 통과한 규칙 표시 */}
      {result.details &&
        result.details.passedCount !== undefined &&
        result.details.totalTests !== undefined && (
          <div className="result-score">
            <strong>📊 통과한 규칙:</strong> {result.details.passedCount}/
            {result.details.totalTests}개
            {result.details.failedCount > 0 && (
              <span style={{ marginLeft: '10px', color: '#e53e3e' }}>
                (실패: {result.details.failedCount}개)
              </span>
            )}
          </div>
        )}

      {result.details && (
        <div className={`result-details ${statusClass}`}>
          {/* 실패한 규칙 정보 */}
          {!isSuccess &&
            result.details.results &&
            (() => {
              const failedRules = result.details.results.filter(
                (r) => !r.passed
              );
              if (failedRules.length > 0) {
                return (
                  <div className="result-failed-rule">
                    <strong>⚠️ 실패한 규칙:</strong>{' '}
                    {failedRules
                      .map(
                        (r) => r.definition?.name || r.rule || '알 수 없는 규칙'
                      )
                      .join(', ')}
                  </div>
                );
              }
              return null;
            })()}

          {/* 전체 힌트 - 실패한 모든 규칙의 힌트 표시 */}
          {!isSuccess &&
            result.details.results &&
            (() => {
              const failedRulesWithHints = result.details.results.filter(
                (r) => !r.passed && r.details?.hint
              );
              if (failedRulesWithHints.length > 0 || result.hint) {
                return (
                  <div className="result-hint">
                    <strong>💡 힌트:</strong>
                    {failedRulesWithHints.map((rule, idx) => (
                      <div key={idx} className="hint-text">
                        • [{rule.definition?.name || rule.rule}]{' '}
                        {rule.details.hint}
                      </div>
                    ))}
                  </div>
                );
              }
              return null;
            })()}

          {/* 각 규칙별 상세 결과 */}
          {result.details.results &&
            Array.isArray(result.details.results) &&
            result.details.results.length > 0 && (
              <div className="result-rules-list">
                <h4>📋 규칙별 결과</h4>
                {result.details.results.map((test, index) => (
                  <div
                    key={index}
                    className={`rule-item ${test.passed ? 'passed' : 'failed'}`}
                  >
                    <div
                      className="rule-header"
                      onClick={() => !test.passed && toggleRule(index)}
                      style={{
                        cursor: test.passed ? 'default' : 'pointer',
                      }}
                    >
                      <span className="rule-icon">
                        {test.passed ? '✅' : '❌'}
                      </span>
                      <span className="rule-name">
                        {test.definition?.name ||
                          test.rule ||
                          `규칙 #${index + 1}`}
                      </span>
                      {!test.passed && (
                        <span className="toggle-icon">
                          {expandedRules[index] ? '▼' : '▶'}
                        </span>
                      )}
                    </div>

                    {test.definition && test.definition.description && (
                      <div className="rule-definition">
                        <div className="rule-def-description">
                          {test.definition.description}
                        </div>
                      </div>
                    )}

                    {/* 실패한 규칙의 상세 정보 표시 (토글) */}
                    {!test.passed && expandedRules[index] && (
                      <>
                        {test.message && test.message !== '통과' && (
                          <div className="rule-message">
                            <strong>실패 이유:</strong> {test.message}
                          </div>
                        )}

                        {test.details && (
                          <div className="rule-details-section">
                            {/* 누락된 시간대 */}
                            {test.details.missing &&
                              Array.isArray(test.details.missing) &&
                              test.details.missing.length > 0 && (
                                <div className="missing-slots">
                                  <strong>
                                    ❌ 누락된 시간대 (
                                    {test.details.missing.length}개):
                                  </strong>
                                  <div className="slots-list">
                                    {test.details.missing.map((slot, i) => (
                                      <div
                                        key={i}
                                        className="slot-item missing"
                                      >
                                        <strong>{slot.day}요일</strong>:{' '}
                                        {slot.start} ~ {slot.end}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                            {/* 불필요한(잘못된) 시간대 */}
                            {test.details.extra &&
                              Array.isArray(test.details.extra) &&
                              test.details.extra.length > 0 && (
                                <div className="extra-slots">
                                  <strong>
                                    ⚠️ 불필요한 시간대 (
                                    {test.details.extra.length}개):
                                  </strong>
                                  <div className="slots-list">
                                    {test.details.extra.map((slot, i) => (
                                      <div key={i} className="slot-item extra">
                                        <strong>{slot.day}요일</strong>:{' '}
                                        {slot.start} ~ {slot.end}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                            {/* 제출/기대 개수 */}
                            {test.details.submitted !== undefined &&
                              test.details.expected !== undefined && (
                                <div className="count-info">
                                  <span>제출: {test.details.submitted}개</span>
                                  <span style={{ margin: '0 10px' }}>|</span>
                                  <span>기대: {test.details.expected}개</span>
                                </div>
                              )}

                            {/* 규칙별 힌트 */}
                            {test.details.hint && (
                              <div className="rule-hint">
                                💡 {test.details.hint}
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
