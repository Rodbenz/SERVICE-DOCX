SELECT count(*) cou , T1.CONDO_B_ID FROM(
                    SELECT CONDO_S_ID, CONDO_B_ID, BUILD_NO, BUILD_GROUP
                    FROM condo.dbo.NCONDO_BUILD
                    WHERE CONDO_S_ID = @CONDO_S_ID ) T1
                    LEFT OUTER JOIN
                    (
                    SELECT CONDO_S_ID, CONDO_B_ID, CONDO_L_ID, OFLEVEL, OFLEVEL_ORDER
                    FROM condo.dbo.NCONDO_LEVEL
                    ) T2
                    ON T1.CONDO_S_ID = T2.CONDO_S_ID AND T1.CONDO_B_ID = T2.CONDO_B_ID
                    LEFT OUTER JOIN
                    (
                    SELECT CONDO_L_ID, CONDO_H_ID, UNIT_NO, ROOM_TYPE_ID
                    FROM condo.dbo.NCONDO_HEADER
                    ) T3
                    ON T2.CONDO_L_ID = T3.CONDO_L_ID
                    LEFT OUTER JOIN
                    (
                    SELECT USE_FLG, CONDO_H_ID, DATE_PRICE, AREA_CONTRACT, PRICE_S, (PRICE_S/AREA_CONTRACT) PRICE_S_PERM, PRICE_DISCOUNT, PRICE_FUR, (PRICE_FUR/AREA_CONTRACT) PRICE_FUR_PERM, (PRICE_S-(PRICE_FUR+PRICE_DISCOUNT)) SUM_PRICE_S, ((PRICE_S-(PRICE_FUR+PRICE_DISCOUNT))/AREA_CONTRACT) SUM_PRICE_S_PERM, PRICE_FUR_EDIT_AREA, (PRICE_FUR_EDIT_AREA*AREA_CONTRACT) SUM_PRICE_FUR_EDIT, (PRICE_S-((PRICE_FUR_EDIT_AREA*AREA_CONTRACT)+PRICE_DISCOUNT)) PRICE_S_EDIT, ((PRICE_S-((PRICE_FUR_EDIT_AREA*AREA_CONTRACT)+PRICE_DISCOUNT))/AREA_CONTRACT) PRICE_S_EDIT_PERM
                    FROM condo.dbo.NCONDO_SALES_ROOM
                    ) T4
                    ON T3.CONDO_H_ID = T4.CONDO_H_ID
                    WHERE USE_FLG = 1
                    GROUP BY T1.CONDO_B_ID
