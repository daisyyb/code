import React, { useState } from "react";

// 오일러 경로를 찾는 함수 (ES6+)
const findEulerianPath = (edges) => {
    // 1단계: 간선 정보를 바탕으로 인접 리스트 생성
    const adjacencyList = {};

    for (const [u, v] of edges) {
        if (!adjacencyList[u]) adjacencyList[u] = [];
        if (!adjacencyList[v]) adjacencyList[v] = [];
        adjacencyList[u].push(v);
        adjacencyList[v].push(u);
    }

    // 2단계: 각 노드의 차수 계산
    const degrees = {};
    for (const node in adjacencyList) {
        degrees[node] = adjacencyList[node].length;
    }

    // 3단계: 홀수 차수를 가진 노드 찾기
    const oddNodes = Object.keys(degrees).filter(node => degrees[node] % 2 !== 0);
    if (oddNodes.length !== 0 && oddNodes.length !== 2) {
        return null; // 오일러 경로가 존재하지 않음
    }

    // 4단계: Hierholzer 알고리즘을 사용하여 오일러 경로 찾기
    const stack = [];
    const path = [];

    const dfs = (node) => {
        while (adjacencyList[node] && adjacencyList[node].length > 0) {
            const neighbor = adjacencyList[node].pop();
            adjacencyList[neighbor] = adjacencyList[neighbor].filter(n => n !== node);
            dfs(neighbor);
        }
        path.push(node);
    };

    const startNode = oddNodes[0] || Object.keys(adjacencyList)[0];
    dfs(startNode);

    return path.reverse();
};

const EulerianPathFinder = () => {
    const [edges, setEdges] = useState([
        ["A", "B"], ["A", "D"],
        ["B", "C"], ["B", "D"], ["B", "E"],
        ["C", "E"],
        ["D", "E"]
    ]);

    const [path, setPath] = useState([]);

    const handleFindPath = () => {
        const result = findEulerianPath(edges);
        setPath(result || ["오일러 경로 없음"]);
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <h1>오일러 경로 찾기</h1>
            <p>간선 목록: {JSON.stringify(edges)}</p>
            <button onClick={handleFindPath} style={{ padding: "10px 20px", marginBottom: "10px" }}>
                경로 찾기
            </button>
            <h2>결과:</h2>
            <p>{path.join(" -> ")}</p>
        </div>
    );
};

export default EulerianPathFinder;
