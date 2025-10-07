import heapq
from collections import Counter, namedtuple

# Define a node structure
class Node(namedtuple("Node", ["char", "freq", "left", "right"])):
    def __lt__(self, other):
        return self.freq < other.freq

# Step 1: Build Huffman Tree
def build_huffman_tree(text):
    frequency = Counter(text)
    heap = [Node(ch, freq, None, None) for ch, freq in frequency.items()]
    heapq.heapify(heap)

    while len(heap) > 1:
        left = heapq.heappop(heap)
        right = heapq.heappop(heap)
        new_node = Node(None, left.freq + right.freq, left, right)
        heapq.heappush(heap, new_node)
    return heap[0]

# Step 2: Generate Huffman Codes
def generate_codes(node, prefix="", code_map={}):
    if node is None:
        return
    if node.char is not None:
        code_map[node.char] = prefix
    generate_codes(node.left, prefix + "0", code_map)
    generate_codes(node.right, prefix + "1", code_map)
    return code_map

# Step 3: Encode and Decode
def huffman_encode(text):
    root = build_huffman_tree(text)
    codes = generate_codes(root)
    encoded_text = ''.join(codes[ch] for ch in text)
    return codes, encoded_text

def huffman_decode(encoded_text, codes):
    reverse_codes = {v: k for k, v in codes.items()}
    current = ""
    decoded = ""
    for bit in encoded_text:
        current += bit
        if current in reverse_codes:
            decoded += reverse_codes[current]
            current = ""
    return decoded

# Example Run
text = "hello huffman"
codes, encoded = huffman_encode(text)
decoded = huffman_decode(encoded, codes)

print("Original Text:", text)
print("Huffman Codes:", codes)
print("Encoded Text:", encoded)
print("Decoded Text:", decoded)
