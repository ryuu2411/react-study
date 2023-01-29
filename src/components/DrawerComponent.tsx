import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

type Props = {
    drawerState: boolean;
    handleChangeColorDrawer: (close: false, str: string) => void;
};

export const DrawerComponent = (props: Props) => {
    const { drawerState, handleChangeColorDrawer } = props;
    return (
        // Drawerを定義
        <Drawer
            anchor="left"
            open={drawerState}
            onClose={() => handleChangeColorDrawer(false, "")}
        >
            {/* DrawerコンポーネントでListをラップする */}
            <List>
                <ListItem divider onClick={() => handleChangeColorDrawer(false, "lightblue")}>
                    <ListItemIcon>
                        <ListItemText>blue</ListItemText>
                    </ListItemIcon>
                </ListItem>
                <ListItem divider onClick={() => handleChangeColorDrawer(false, "lightgreen")}>
                    <ListItemIcon>
                        <ListItemText>green</ListItemText>
                    </ListItemIcon>
                </ListItem>
                <ListItem divider onClick={() => handleChangeColorDrawer(false, "white")}>
                    <ListItemIcon>
                        <ListItemText>white</ListItemText>
                    </ListItemIcon>
                </ListItem>
            </List>
        </Drawer>
    );
};
