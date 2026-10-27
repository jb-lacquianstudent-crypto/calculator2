import React, { useState } from 'react';

export default function App() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [hasResult, setHasResult] = useState(false);

  // Handle Number Inputs
  const handleNumber = (val) => {
    if (hasResult || display === 'Justine Lacquian') {
      setDisplay(val);
      setExpression(val);
      setHasResult(false);
    } else {
      if (display === '0') {
        setDisplay(val);
        setExpression((prev) => (prev.endsWith(' ') ? prev + val : val));
      } else {
        setDisplay((prev) => prev + val);
        setExpression((prev) => prev + val);
      }
    }
  };

  // Handle Operators (+, -, *, ÷)
  const handleOperator = (op) => {
    if (display === 'Justine Lacquian') return;

    if (hasResult) {
      setExpression(display + ' ' + op + ' ');
      setHasResult(false);
    } else {
      const trimmed = expression.trim();
      const lastChar = trimmed.slice(-1);

      if (['+', '-', '*', '÷'].includes(lastChar)) {
        setExpression(trimmed.slice(0, -1) + ' ' + op + ' ');
      } else {
        setExpression(expression + ' ' + op + ' ');
      }
    }
    setDisplay('0');
  };

  // Clear Display
  const handleClear = () => {
    setDisplay('0');
    setExpression('');
    setHasResult(false);
  };

  // Calculate Result
  const handleEquals = () => {
    if (!expression || hasResult || display === 'Justine Lacquian') return;
    try {
      const sanitized = expression.replace(/÷/g, '/');
      const result = Function(`'use strict'; return (${sanitized})`)();
      
      if (isNaN(result) || !isFinite(result)) {
        setDisplay('Error');
      } else {
        const formatted = Number.isInteger(result) 
          ? result.toString() 
          : parseFloat(result.toFixed(6)).toString();
        setDisplay(formatted);
        setExpression(expression + ' = ' + formatted);
      }
      setHasResult(true);
    } catch {
      setDisplay('Error');
      setHasResult(true);
    }
  };

  // Requirement 2: Surname Button Click Action
  const handleSurname = () => {
    setDisplay('Justine Lacquian');
    setExpression('');
    setHasResult(true);
  };

  // Requirement 3: Personalized Inline Styling
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#090d16',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      boxSizing: 'border-box'
    },
    header: {
      marginBottom: '24px',
      textAlign: 'center'
    },
    title: {
      fontSize: '26px',
      fontWeight: '800',
      color: '#38bdf8',
      margin: '0 0 6px 0',
      letterSpacing: '0.5px'
    },
    subtitle: {
      fontSize: '13px',
      color: '#94a3b8',
      margin: 0,
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },
    card: {
      width: '100%',
      maxWidth: '340px',
      backgroundColor: '#111827',
      borderRadius: '28px',
      padding: '24px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
      border: '1px solid #1f2937',
      boxSizing: 'border-box'
    },
    displayBox: {
      backgroundColor: '#030712',
      borderRadius: '20px',
      padding: '18px',
      marginBottom: '20px',
      textAlign: 'right',
      border: '1px solid #111827',
      minHeight: '90px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.6)'
    },
    expressionText: {
      fontSize: '13px',
      color: '#6b7280',
      minHeight: '20px',
      overflowX: 'auto',
      whiteSpace: 'nowrap'
    },
    displayText: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#f9fafb',
      overflowX: 'auto',
      whiteSpace: 'nowrap',
      marginTop: '4px'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '12px'
    },
    btn: {
      border: 'none',
      borderRadius: '16px',
      padding: '16px 0',
      fontSize: '18px',
      fontWeight: '600',
      cursor: 'pointer',
      outline: 'none',
      userSelect: 'none'
    },
    btnNum: {
      backgroundColor: '#1f2937',
      color: '#f3f4f6'
    },
    btnOp: {
      backgroundColor: 'rgba(14, 165, 233, 0.15)',
      color: '#38bdf8',
      border: '1px solid rgba(14, 165, 233, 0.3)',
      fontWeight: '700'
    },
    btnClear: {
      gridColumn: 'span 3',
      backgroundColor: 'rgba(244, 63, 94, 0.15)',
      color: '#fb7185',
      border: '1px solid rgba(244, 63, 94, 0.3)',
      fontWeight: '700'
    },
    btnEquals: {
      gridColumn: 'span 2',
      backgroundColor: '#0284c7',
      color: '#ffffff',
      fontWeight: '800',
      fontSize: '22px'
    },
    btnSurname: {
      gridColumn: 'span 4',
      marginTop: '6px',
      background: 'linear-gradient(135deg, #2563eb 0%, #0284c7 100%)',
      color: '#ffffff',
      fontWeight: '700',
      fontSize: '15px',
      letterSpacing: '1.5px',
      textTransform: 'uppercase',
      padding: '16px 0',
      boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
    }
  };

  return (
    <div style={styles.container}>
      
      {/* Requirement 1: Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>
          Calculator of Justine Lacquian - BSIT WMDA
        </h1>
        <p style={styles.subtitle}>Web & Mobile Application Development</p>
      </header>

      {/* Requirement 3: Personalized Calculator UI Card */}
      <div style={styles.card}>
        
        {/* Screen Display */}
        <div style={styles.displayBox}>
          <div style={styles.expressionText}>
            {expression || ' '}
          </div>
          <div style={styles.displayText}>
            {display}
          </div>
        </div>

        {/* Buttons Grid */}
        <div style={styles.grid}>
          {/* Row 1 */}
          <button onClick={handleClear} style={{ ...styles.btn, ...styles.btnClear }}>
            C
          </button>
          <button onClick={() => handleOperator('÷')} style={{ ...styles.btn, ...styles.btnOp }}>
            ÷
          </button>

          {/* Row 2 */}
          <button onClick={() => handleNumber('7')} style={{ ...styles.btn, ...styles.btnNum }}>7</button>
          <button onClick={() => handleNumber('8')} style={{ ...styles.btn, ...styles.btnNum }}>8</button>
          <button onClick={() => handleNumber('9')} style={{ ...styles.btn, ...styles.btnNum }}>9</button>
          <button onClick={() => handleOperator('*')} style={{ ...styles.btn, ...styles.btnOp }}>
            *
          </button>

          {/* Row 3 */}
          <button onClick={() => handleNumber('4')} style={{ ...styles.btn, ...styles.btnNum }}>4</button>
          <button onClick={() => handleNumber('5')} style={{ ...styles.btn, ...styles.btnNum }}>5</button>
          <button onClick={() => handleNumber('6')} style={{ ...styles.btn, ...styles.btnNum }}>6</button>
          <button onClick={() => handleOperator('-')} style={{ ...styles.btn, ...styles.btnOp }}>
            -
          </button>

          {/* Row 4 */}
          <button onClick={() => handleNumber('1')} style={{ ...styles.btn, ...styles.btnNum }}>1</button>
          <button onClick={() => handleNumber('2')} style={{ ...styles.btn, ...styles.btnNum }}>2</button>
          <button onClick={() => handleNumber('3')} style={{ ...styles.btn, ...styles.btnNum }}>3</button>
          <button onClick={() => handleOperator('+')} style={{ ...styles.btn, ...styles.btnOp }}>
            +
          </button>

          {/* Row 5 */}
          <button onClick={() => handleNumber('0')} style={{ ...styles.btn, ...styles.btnNum, gridColumn: 'span 2' }}>0</button>
          <button onClick={handleEquals} style={{ ...styles.btn, ...styles.btnEquals }}>
            =
          </button>

          {/* Requirement 2: Additional Surname Button */}
          <button onClick={handleSurname} style={{ ...styles.btn, ...styles.btnSurname }}>
            Lacquian
          </button>
        </div>
      </div>
    </div>
  );
}