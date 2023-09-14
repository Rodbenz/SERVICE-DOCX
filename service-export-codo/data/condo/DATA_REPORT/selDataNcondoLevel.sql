SELECT T4.BUILD_NO, T5.OFLEVEL, T5.OFLEVEL_ORDER, AST_DESC, COUNT(1) NUM_, T2.NAMETH, AST_UNTCNT, (T3.NAMETH + '/' + T2.NAMETH) AS NAMETH_CONTAIN
FROM (
SELECT AST_DESC, AST_AMT, AST_UNTCNT, AST_CONTAIN, CONDO_S_ID, CONDO_L_ID, CONDO_B_ID
FROM condo.dbo.NCONDO_ASSET
WHERE CONDO_S_ID = @CONDO_S_ID
) T1
LEFT OUTER JOIN
(
SELECT ID, NAMETH
FROM condo.dbo.UNITMEA
) T2
ON T1.AST_AMT = T2.ID
LEFT OUTER JOIN
(
SELECT ID, NAMETH
FROM condo.dbo.UNITMEA
) T3
ON T1.AST_CONTAIN = T3.ID
LEFT OUTER JOIN
(
SELECT CONDO_S_ID, CONDO_B_ID, BUILD_NO 
FROM condo.dbo.NCONDO_BUILD
) T4
ON T1.CONDO_S_ID = T4.CONDO_S_ID
AND T1.CONDO_B_ID = T4.CONDO_B_ID
LEFT OUTER JOIN
(
SELECT CONDO_S_ID, CONDO_B_ID, CONDO_L_ID, OFLEVEL, OFLEVEL_ORDER
FROM condo.dbo.NCONDO_LEVEL
) T5
ON T1.CONDO_S_ID = T5.CONDO_S_ID
AND T1.CONDO_B_ID = T5.CONDO_B_ID
AND T1.CONDO_L_ID = T5.CONDO_L_ID
GROUP BY T4.BUILD_NO, T5.OFLEVEL, T5.OFLEVEL_ORDER, AST_DESC, T2.NAMETH, AST_UNTCNT, T3.NAMETH
ORDER BY BUILD_NO, OFLEVEL_ORDER, AST_DESC