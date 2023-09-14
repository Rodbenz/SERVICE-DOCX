SELECT T2.CONDO_B_ID
, CASE WHEN T3.BUILD_NO IS NULL THEN 'นอกอาคาร' ELSE T3.BUILD_NO END BUILD_NO
, T4.OFLEVEL, ISNULL(T4.OFLEVEL_ORDER,0) OFLEVEL_ORDER, T2.AST_DESC, SUM(CAST(T2.AST_UNTCNT as int)) SUM_AST_UNTCNT
FROM(
SELECT CONDO_S_ID
FROM condo.dbo.NCONDOS
WHERE CONDO_S_ID = @CONDO_S_ID) T1
LEFT OUTER JOIN
(
SELECT CONDO_S_ID, CONDO_B_ID, CONDO_L_ID, AST_DESC, AST_UNTCNT
FROM condo.dbo.NCONDO_ASSET
) T2
ON T1.CONDO_S_ID = T2.CONDO_S_ID
LEFT OUTER JOIN
(
SELECT CONDO_S_ID, CONDO_B_ID, BUILD_NO, BUILDING_TYPE_ID, BUILD_AREA
FROM condo.dbo.NCONDO_BUILD
) T3
ON T1.CONDO_S_ID = T3.CONDO_S_ID
AND T2.CONDO_B_ID = T3.CONDO_B_ID
LEFT OUTER JOIN
(
SELECT CONDO_S_ID, CONDO_B_ID, CONDO_L_ID, OFLEVEL, OFLEVEL_ORDER
FROM condo.dbo.NCONDO_LEVEL
) T4
ON T1.CONDO_S_ID = T4.CONDO_S_ID
AND T2.CONDO_B_ID = T4.CONDO_B_ID
AND T2.CONDO_L_ID = T4.CONDO_L_ID
WHERE AST_DESC like '%จอดรถยนต์%'
GROUP BY T2.CONDO_B_ID, T3.BUILD_NO, T4.OFLEVEL, T4.OFLEVEL_ORDER, T2.AST_DESC
ORDER BY T2.CONDO_B_ID, T4.OFLEVEL_ORDER