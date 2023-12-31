SELECT TTA1.ROOM_TYPE_NAME, TTA1.BUILD_NO, TTA1.MIN_OFLEVEL_ORDER, TTA2.OFLEVEL AS MIN_OFLEVEL, TTA1.MAX_OFLEVEL_ORDER, TTA3.OFLEVEL AS MAX_OFLEVEL, TTA1.COUNT_NUM_ROOM, TTA1.MIN_PERSONAL_P_AREA, TTA1.MAX_PERSONAL_P_AREA
FROM(
SELECT T4.ROOM_TYPE_NAME, T5.BUILD_NO, T5.CONDO_B_ID, T5.CONDO_B_ORDER, MIN(T3.OFLEVEL_ORDER) MIN_OFLEVEL_ORDER, MAX(T3.OFLEVEL_ORDER) MAX_OFLEVEL_ORDER, COUNT(*) COUNT_NUM_ROOM, MIN(T2.SUM_PERSONAL_P_AREA) MIN_PERSONAL_P_AREA, MAX(T2.SUM_PERSONAL_P_AREA) MAX_PERSONAL_P_AREA
FROM(
SELECT CONDO_S_ID, CONDO_B_ID, CONDO_L_ID, CONDO_H_ID, UNIT_NO, ROOM_TYPE_ID
FROM condo.dbo.NCONDO_HEADER
WHERE CONDO_S_ID = @CONDO_S_ID
) T1
LEFT OUTER JOIN
(
SELECT CONDO_S_ID, CONDO_B_ID, CONDO_L_ID, CONDO_H_ID, SUM(PERSONAL_P_AREA) SUM_PERSONAL_P_AREA
FROM condo.dbo.PERSONAL_PROPERTY
GROUP BY CONDO_S_ID, CONDO_B_ID, CONDO_L_ID, CONDO_H_ID
) T2
ON T1.CONDO_S_ID = T2.CONDO_S_ID
AND T1.CONDO_B_ID = T2.CONDO_B_ID
AND T1.CONDO_L_ID = T2.CONDO_L_ID
AND T1.CONDO_H_ID = T2.CONDO_H_ID
LEFT OUTER JOIN
(
SELECT CONDO_S_ID, CONDO_B_ID, CONDO_L_ID, OFLEVEL, OFLEVEL_ORDER
FROM condo.dbo.NCONDO_LEVEL
) T3
ON T1.CONDO_S_ID = T3.CONDO_S_ID
AND T1.CONDO_B_ID = T3.CONDO_B_ID
AND T1.CONDO_L_ID = T3.CONDO_L_ID
LEFT OUTER JOIN
(
SELECT ROOM_TYPE_ID, ROOM_TYPE_NAME
FROM condo.dbo.ROOM_TYPE
) T4
ON T1.ROOM_TYPE_ID = T4.ROOM_TYPE_ID
LEFT OUTER JOIN
(
SELECT CONDO_S_ID, CONDO_B_ID, BUILD_NO, CONDO_B_ORDER
FROM condo.dbo.NCONDO_BUILD
) T5
ON T1.CONDO_S_ID = T5.CONDO_S_ID
AND T3.CONDO_B_ID = T5.CONDO_B_ID
GROUP BY T4.ROOM_TYPE_NAME, T5.BUILD_NO, T5.CONDO_B_ID, T5.CONDO_B_ORDER
) TTA1
LEFT OUTER JOIN
(
SELECT CONDO_B_ID, OFLEVEL, OFLEVEL_ORDER
FROM condo.dbo.NCONDO_LEVEL
WHERE CONDO_S_ID = @CONDO_S_ID
GROUP BY CONDO_B_ID, OFLEVEL, OFLEVEL_ORDER
) TTA2
ON 1=1
AND TTA1.MIN_OFLEVEL_ORDER = TTA2.OFLEVEL_ORDER
AND TTA1.CONDO_B_ID = TTA2.CONDO_B_ID
LEFT OUTER JOIN
(
SELECT CONDO_B_ID, OFLEVEL, OFLEVEL_ORDER
FROM condo.dbo.NCONDO_LEVEL
WHERE CONDO_S_ID = @CONDO_S_ID
GROUP BY CONDO_B_ID, OFLEVEL, OFLEVEL_ORDER
) TTA3
ON 1=1
AND TTA1.MAX_OFLEVEL_ORDER = TTA3.OFLEVEL_ORDER
AND TTA1.CONDO_B_ID = TTA3.CONDO_B_ID
ORDER BY TTA1.ROOM_TYPE_NAME, TTA1.CONDO_B_ORDER