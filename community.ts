import Graph from 'graphology';
import louvain from 'graphology-communities-louvain';
import uniqolor from 'uniqolor';

// Define interfaces for nodes and edges
interface Node {
    id: string;
    [key: string]: any; // Allow additional properties
}

interface Edge {
    source: string;
    target: string;
    [key: string]: any; // Allow additional properties
}

// Function to detect communities in a graph
function detect(nodes: Node[], edges: Edge[], keepOriginal: []): Array<Node & { fill: string }> {
    const graph = new Graph({multi:true});
    
    // Rename nodes while preserving their IDs
    const renamedNodes = nodes.map(({ id }) => ({ id, key: id }));
    
    // Import nodes and edges into the graph
    graph.import({
        attributes: { name: 'My Graph' },
        nodes: renamedNodes,
        edges: edges,
    });
    
    // Assign communities using Louvain method
    louvain.assign(graph);
    
    // Set color to each community and return updated nodes
    return setColorToCommunity(nodes, graph, keepOriginal);
}

// Function to set colors based on community detection
function setColorToCommunity(nodes: Node[], graph: Graph, keepOriginal: []): Array<Node & { fill: string }> {
    return nodes.map(item => {
        const communityID = graph.getNodeAttribute(item.id, 'community');
        const color = uniqolor(communityID * 15).color;
        if (keepOriginal?.includes(item?.fill)){
            return item;
        }
        return { ...item, fill: color};
    });
}

// Export the communityDetection object with the detect function
export const communityDetection = {
    detect,
};
