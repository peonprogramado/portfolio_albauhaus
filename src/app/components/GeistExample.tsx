import React from 'react';

const GeistExample: React.FC = () => {
  return (
    <div className="p-8 space-y-6">
      <h1 className="geist-sans geist-black text-4xl">
        Geist Variable Font Example
      </h1>
      
      <div className="space-y-4">
        <p className="geist-sans geist-thin text-lg">
          Thin (100) - The quick brown fox jumps over the lazy dog
        </p>
        <p className="geist-sans geist-extralight text-lg">
          Extra Light (200) - The quick brown fox jumps over the lazy dog
        </p>
        <p className="geist-sans geist-light text-lg">
          Light (300) - The quick brown fox jumps over the lazy dog
        </p>
        <p className="geist-sans geist-normal text-lg">
          Normal (400) - The quick brown fox jumps over the lazy dog
        </p>
        <p className="geist-sans geist-medium text-lg">
          Medium (500) - The quick brown fox jumps over the lazy dog
        </p>
        <p className="geist-sans geist-semibold text-lg">
          Semi Bold (600) - The quick brown fox jumps over the lazy dog
        </p>
        <p className="geist-sans geist-bold text-lg">
          Bold (700) - The quick brown fox jumps over the lazy dog
        </p>
        <p className="geist-sans geist-extrabold text-lg">
          Extra Bold (800) - The quick brown fox jumps over the lazy dog
        </p>
        <p className="geist-sans geist-black text-lg">
          Black (900) - The quick brown fox jumps over the lazy dog
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <h2 className="geist-sans geist-bold text-2xl">Geist Mono Examples</h2>
        <p className="geist-mono geist-normal text-sm">
          const example = "This is Geist Mono font";
        </p>
        <p className="geist-mono geist-medium text-sm">
          function hello() &#123; return "Hello World"; &#125;
        </p>
        <p className="geist-mono geist-bold text-sm">
          // This is a comment in Geist Mono Bold
        </p>
      </div>

      <div className="mt-8 space-y-2">
        <h3 className="geist-sans geist-semibold text-xl">Usage Examples:</h3>
        <code className="geist-mono geist-normal text-sm bg-gray-100 p-2 rounded block">
          &lt;p className="geist-sans geist-medium"&gt;Medium weight text&lt;/p&gt;
        </code>
        <code className="geist-mono geist-normal text-sm bg-gray-100 p-2 rounded block">
          &lt;h1 className="geist-sans geist-black"&gt;Black weight heading&lt;/h1&gt;
        </code>
        <code className="geist-mono geist-normal text-sm bg-gray-100 p-2 rounded block">
          &lt;code className="geist-mono geist-medium"&gt;Code snippet&lt;/code&gt;
        </code>
      </div>
    </div>
  );
};

export default GeistExample;
