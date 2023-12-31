SELECT T1.MAXLEVEL, T2.COUNT_LIFT
FROM (
SELECT MAX(BLD_FL_TOT) MAXLEVEL, CONDO_S_ID
FROM condo.dbo.NCONDO_BUILD WITH (NOLOCK) 
WHERE CONDO_S_ID = @CONDO_S_ID
GROUP BY CONDO_S_ID
) T1
LEFT OUTER JOIN
(
SELECT COUNT(*) COUNT_LIFT, CONDO_S_ID
FROM condo.dbo.NCONDO_ASSET WITH (NOLOCK) 
WHERE CONDO_A_CAT = 4
GROUP BY CONDO_S_ID
) T2
ON T1.CONDO_S_ID = T2.CONDO_S_ID