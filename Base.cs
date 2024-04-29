using UnityEditor;
using UnityEngine;

[CustomEditor(typeof(MonoBehaviour), editorForChildClasses: true)]
public class Base : Editor
{
    bool isUnityNamespace;
    bool isLocalNamespace;

    protected virtual void OnEnable()
    {
        string targetNamespace = target.GetType().Namespace;

        if (!string.IsNullOrEmpty(targetNamespace))
        {
            isUnityNamespace = targetNamespace.StartsWith("Unity");
            isLocalNamespace = targetNamespace.StartsWith("SN");
        }
    }

    public override void OnInspectorGUI()
    {
        if (!isUnityNamespace && isLocalNamespace)
            CustomFlow();

        base.OnInspectorGUI();
    }

    private void CustomFlow()
    {
        Color originalColor = GUI.backgroundColor;
        GUI.backgroundColor = Color.yellow; // Light yellow
        EditorGUILayout.BeginVertical(GUI.skin.box);

        // Create a clickable label for the MonoBehaviour's name
        GUIStyle labelStyle = new GUIStyle(EditorStyles.whiteLargeLabel);
        labelStyle.normal.textColor = Color.blue; // Change text color for visual indication
        GUIContent labelContent = new GUIContent(target.GetType().Name + " Editor");
        Rect labelRect = GUILayoutUtility.GetRect(labelContent, labelStyle);
        if (GUI.Button(labelRect, labelContent, labelStyle))
        {
            OpenScriptFile();
        }

        EditorGUILayout.EndVertical();
        GUI.backgroundColor = originalColor;
        DrawDefaultInspector();
    }

    private void OpenScriptFile()
    {
        // Get the path to the script file associated with the MonoBehaviour
        MonoScript script = MonoScript.FromMonoBehaviour((MonoBehaviour)target);
        string scriptPath = AssetDatabase.GetAssetPath(script);

        // Open the script file in the Unity editor
        var line = 0; // You can set the line number to open, or keep it as 0 for opening at the top
        var col = 0; // You can set the column number to open, or keep it as 0 for opening at the start of the line
        AssetDatabase.OpenAsset(script, line, col);
    }

}
