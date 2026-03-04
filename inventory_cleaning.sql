-- 1. Create the messy table
CREATE TABLE inventory_messy (
  ProductID INT,
  Product_Name VARCHAR(50),
  Category VARCHAR(50),
  Price VARCHAR(20),
  Stock_Count INT
);

-- 2. Insert the dirty raw data
INSERT INTO inventory_messy VALUES
(101, 'Air Jordan 1 ', 'Sneakers', '$180', 10),
(102, 'nike air max', 'Sneakers', '150', 5),
(103, 'Adidas Superstar', 'Sneakers', '85', NULL),
(101, 'Air Jordan 1 ', 'Sneakers', '$180', 10),
(104, 'Running Shirt', 'Apparel', '40', 20),
(105, 'Unknown Item', 'NULL', '0', 50),
(102, 'Nike Air Max ', 'Sneakers', '300', 2),
(106, 'Yeezy Boost', 'Sneakers', '300', 2),
(107, 'Socks', 'Accessories', '15', 100),
(108, 'Running Shirt', 'Apparel', '$40', NULL);

-- 3. Clean the data and calculate total inventory value
WITH Clean_Inventory AS (
  SELECT DISTINCT
    ProductID,
    TRIM(UPPER(Product_Name)) AS Clean_Name,
    UPPER(Category) AS Clean_Category,
    CAST(REPLACE(Price, '$', '') AS DECIMAL(10,2)) AS Clean_Price,
    COALESCE(Stock_Count, 0) AS Clean_Stock
  FROM inventory_messy
)

SELECT 
  Clean_Category,
  SUM(Clean_Price * Clean_Stock) AS Total_Dollar_Value
FROM Clean_Inventory
GROUP BY Clean_Category
ORDER BY Total_Dollar_Value DESC;
